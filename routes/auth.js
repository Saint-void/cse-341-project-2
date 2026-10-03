const router = require('express').Router();
const passport = require('passport');
const { requireAuth, requireGitHubConfig } = require('../middleware/auth');

router.get('/github', (req, res, next) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Sign up or log in with GitHub'
    #swagger.description = 'Redirects to GitHub OAuth. A successful callback creates a local session for the GitHub profile.'
    #swagger.responses[302] = { description: 'Redirect to GitHub for authorization' }
    #swagger.responses[503] = { description: 'GitHub OAuth is not configured' }
  */
  requireGitHubConfig(req, res, () => passport.authenticate('github', {
    scope: ['read:user'],
    state: true
  })(req, res, next));
});

router.get('/github/callback', requireGitHubConfig, passport.authenticate('github', {
  failureRedirect: '/'
}), (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Complete GitHub login'
    #swagger.description = 'Handles GitHub authorization and redirects to the authenticated profile endpoint.'
    #swagger.responses[302] = { description: 'Redirect to /auth/me after successful login' }
    #swagger.responses[503] = { description: 'GitHub OAuth is not configured' }
  */
  res.redirect('/auth/me');
});

router.get('/me', requireAuth, (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Get the authenticated GitHub user'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.responses[200] = { description: 'Authenticated user profile', schema: { user: { id: '12345', username: 'octocat', displayName: 'The Octocat' } } }
    #swagger.responses[401] = { description: 'Authentication required' }
  */
  res.json({ user: req.user });
});

router.post('/logout', requireAuth, (req, res, next) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Log out'
    #swagger.description = 'Ends the current server-side session and clears its cookie.'
    #swagger.security = [{ 'SessionCookie': [] }]
    #swagger.responses[401] = { description: 'Authentication required' }
    #swagger.responses[204] = { description: 'Session ended' }
  */
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);
      res.clearCookie('bookstore.sid', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      });
      return res.sendStatus(204);
    });
  });
});

module.exports = router;