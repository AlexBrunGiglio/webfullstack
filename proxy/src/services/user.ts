import { Express } from "express";
import axios from "axios";

const baseUrl = "http://nginx/api";

const initUserService = (app: Express) => {
  app.get("/api/hello", (_, res) => {
    axios.get(`${baseUrl}/hello`).then((onfulfilled) => {
      res.send(onfulfilled.data);
    });
  });

  app.post("/api/.user/inscription", (req, res) => {
    axios
      .post(
        `${baseUrl}/inscription/`,
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone_number: req.body.phone_number,
          nationality: req.body.nationality,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch(() => {
        res.send({
          success: false,
          message: "Error during user registration",
        });
      });
  });

  app.post("/api/.user/validate-user/:id", (req, res) => {
    axios
      .post(
        `${baseUrl}/inscription/validate-user/${req.params.id}`,
        {},
        {
          headers: {
            Authorization: req.header("Authorization"),
          },
        }
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch(() => {
        res.send({ success: false, message: "Error during user validation" });
      });
  });

  app.post("/api/.user/login", (req, res) => {
    axios
      .post(
        `${baseUrl}/login_check`,
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        res.send({
          success: true,
          data: response.data,
          message: "User logged in",
        });
      })
      .catch(() => {
        res.send({ success: false, message: "Invalid credentials" });
      });
  });

  app.post("/api/.user/login/admin", (req, res) => {
    axios
      .post(
        `${baseUrl}/login_check`,
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const token = response.data.token;
        axios
          .post(
            `${baseUrl}/user/check_role`,
            {
              role: "ROLE_ADMIN",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            if (response.data.isAuthorized) {
              res.send({
                success: true,
                data: { token },
                message: "Admin logged in",
              });
            } else {
              res.send({ success: false, message: "You are not an admin" });
            }
          });
      })
      .catch((error) => {
        res.send({ success: false, message: "Invalid credentials" });
      });
  });

  app.get("/api/.user/user", (req, res) => {
    axios
      .get(`${baseUrl}/user`, {
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.send(response.data);
      });
  });

  app.get("/api/.user/users", (req, res) => {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.send(response.data);
      });
  });

  app.get("/api/.user/future-users", (req, res) => {
    axios
      .get(`${baseUrl}/future-users`, {
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.send(response.data);
      });
  });

  app.get("/api/.user/admin", (req, res) => {
    axios
      .get(`${baseUrl}/admin`, {
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.send(response.data);
      });
  });

  app.post("/api/.user/checkRole", (req, res) => {
    axios
      .post(
        `${baseUrl}/user/check_role`,
        {
          role: req.body.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.header("Authorization"),
          },
        }
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch(() => {
        res.send({ success: false, message: "Error during user check role" });
      });
  });
};

export default initUserService;
