/**
 * Layer 1: Environment Configuration
 * All env variables in one place
 */

module.exports = {
  PORT:       process.env.PORT       || 3001,
  NODE_ENV:   process.env.NODE_ENV   || 'development',
  MONGO_URI:  process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // Game settings
  GAME: {
    MIN_PLAYERS:       2,
    MAX_PLAYERS:       8,
    DEFAULT_ROUNDS:    3,
    DEFAULT_DRAW_TIME: 80,
    WORD_SELECT_TIME:  15,
    RESULT_WAIT_TIME:  6000,
    MAX_SCORE:         300,
    MIN_SCORE:         50,
  },
}
