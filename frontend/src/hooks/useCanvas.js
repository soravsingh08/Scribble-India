import { useRef, useEffect, useCallback } from 'react'
import { useSocket } from '../context/SocketContext.jsx'

export function useCanvas({ canDraw, color, size, tool }) {
  const canvasRef  = useRef(null)
  const isDrawing  = useRef(false)
  const localLast  = useRef(null)
  const remoteLast = useRef(null)

  const { sendDraw, onDraw, offDraw, onClear, offClear } = useSocket()

  const getCtx = useCallback(() => {
    return canvasRef.current?.getContext('2d') ?? null
  }, [])

  const drawSegment = useCallback((from, to, evt) => {
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return

    const W = canvas.width
    const H = canvas.height
    const toX = to.x * W
    const toY = to.y * H

    ctx.lineCap  = 'round'
    ctx.lineJoin = 'round'

    if (evt.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineWidth = evt.size * 2.5
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = evt.color
      ctx.lineWidth = evt.size
    }

    if (!from || evt.type === 'start') {
      ctx.beginPath()
      const r = (evt.size / 2) * (evt.tool === 'eraser' ? 2.5 : 1)
      ctx.arc(toX, toY, Math.max(1, r), 0, Math.PI * 2)
      ctx.fillStyle = evt.tool === 'eraser' ? 'rgba(0,0,0,1)' : evt.color
      ctx.fill()
    } else {
      const fromX = from.x * W
      const fromY = from.y * H
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()
    }

    ctx.globalCompositeOperation = 'source-over'
  }, [getCtx])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [getCtx])

  // Remote draw + clear listeners
  useEffect(() => {
    const handleRemote = (evt) => {
      if (evt.type === 'start') remoteLast.current = null
      drawSegment(remoteLast.current, { x: evt.x, y: evt.y }, evt)
      remoteLast.current = evt.type === 'end' ? null : { x: evt.x, y: evt.y }
    }
    const handleClear = () => initCanvas()

    onDraw(handleRemote)
    onClear(handleClear)
    return () => {
      offDraw(handleRemote)
      offClear(handleClear)
    }
  }, [onDraw, offDraw, onClear, offClear, drawSegment, initCanvas])

  function getNorm(e, canvas) {
    // canvas.width/height now equals actual CSS px size (set by ResizeObserver in CanvasEl)
    // So rect.width === canvas.width always → perfect 1:1 alignment
    const rect = canvas.getBoundingClientRect()
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top)  / rect.height))
    return { x: nx, y: ny }
  }

  const handlePointerDown = useCallback((e) => {
    if (!canDraw) return
    e.currentTarget.setPointerCapture(e.pointerId)
    isDrawing.current = true
    localLast.current = null

    const norm = getNorm(e, canvasRef.current)
    const evt = { x: norm.x, y: norm.y, type: 'start', color, size, tool }
    drawSegment(null, norm, evt)
    sendDraw(evt)
    localLast.current = norm
  }, [canDraw, color, size, tool, drawSegment, sendDraw])

  const handlePointerMove = useCallback((e) => {
    if (!canDraw || !isDrawing.current) return
    const norm = getNorm(e, canvasRef.current)
    const evt = { x: norm.x, y: norm.y, type: 'draw', color, size, tool }
    drawSegment(localLast.current, norm, evt)
    sendDraw(evt)
    localLast.current = norm
  }, [canDraw, color, size, tool, drawSegment, sendDraw])

  const handlePointerUp = useCallback((e) => {
    if (!canDraw || !isDrawing.current) return
    isDrawing.current = false
    const norm = getNorm(e, canvasRef.current)
    const evt = { x: norm.x, y: norm.y, type: 'end', color, size, tool }
    sendDraw(evt)
    localLast.current = null
  }, [canDraw, color, size, tool, sendDraw])

  return { canvasRef, initCanvas, handlePointerDown, handlePointerMove, handlePointerUp }
}
