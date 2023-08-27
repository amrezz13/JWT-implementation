const validInfo = (req, res, next) => {
  const { user_email, user_name, user_password } = req.body;
  console.log('this is request ', req.body)

  

  console.log(req.body);

  function validEmail(user_email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email);
  }

  if (req.path === "/register") {
    //console.log(!email.length);
    if (![user_email, user_name, user_password].every(Boolean)) {
      return res.json("Invalid Email");
    } else if (!validEmail(email)) {
      return res.status(500).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![user_email, user_password].every(Boolean)) {
      console.log(user_email)
      return res.json("Missing Credentials");
    } else if (!validEmail(user_email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};

export default validInfo;