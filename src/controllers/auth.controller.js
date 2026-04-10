const bcrypt = require("bcrypt");
const User = require("../models/User");

function renderAuth(res, options = {}) {
  return res.render("pages/auth", {
    title: "Connexion / Inscription",
    pageCss: ["global.css", "auth.css"],
    pageJs: "auth.js",
    loginError: null,
    registerError: null,
    ...options
  });
}

function showAuth(req, res) {
  renderAuth(res);
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return renderAuth(res, {
        registerError: "Cet email est déjà utilisé."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash
    });

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    req.session.save(() => {
      res.redirect("/editor");
    });
  } catch (error) {
    return renderAuth(res, {
      registerError: "Erreur lors de l'inscription."
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return renderAuth(res, {
        loginError: "Email ou mot de passe invalide."
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return renderAuth(res, {
        loginError: "Email ou mot de passe invalide."
      });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return renderAuth(res, {
          loginError: "Erreur session"
        });
      }

      res.redirect("/dashboard");
    });
  } catch (error) {
    return renderAuth(res, {
      loginError: "Erreur lors de la connexion."
    });
  }
}
function showAuth(req, res) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  renderAuth(res);
}
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  showAuth,
  register,
  login,
  logout
};