## 🚀 Get Started

1.  Make sure Docker deamon is running, then run

  ```
    docker-compose up
  ```
2. Add `.env` file

Add env according to `.env.example` file

3. Add seed data

  Move the 2 files in `./seeds` to `./database/migrations`, save file and the program will auto-reload.

4. Open [localhost:1337/admin](http://localhost:1337/admin) to see Admin UI page

5. Create new user account

6. Check under `Content Manager` to see seeds in database!

  ```
    { name: 'Jack', uuid: 'ccfe4227-962e-4ed3-83e8-9d2a35bf9878', points: 0 },
    { name: 'David', uuid: '9a65278b-b164-4dcc-94b0-0dfe962f96b0', points: 100 },
    { name: 'Melissa', uuid: 'a3029b5c-f53d-4011-ab37-f2420f35c64b', points: 1000}
  ```

## 🎁 Test api

- Middleware is added, testing apis requires bringing authorization token.

Use **Postman** Authorization, Type: Bearer Token.

Token value for each customer is pre-generated and as listed:

  `Jack: eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTc0MDM3MzMsImN1c3RvbWVyVXVpZCI6ImNjZmU0MjI3LTk2MmUtNGVkMy04M2U4LTlkMmEzNWJmOTg3OCJ9.D01bpXZkoW3TGucXA4oIefYk2RypUMYv3DE7bxRsWqs`

  `David: eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTc0MDM3MzMsImN1c3RvbWVyVXVpZCI6IjlhNjUyNzhiLWIxNjQtNGRjYy05NGIwLTBkZmU5NjJmOTZiMCJ9._cFfI_N2HyaJXxVXnw8KvtvM0IuiAP3SoLitAUSNNLA`

  `Melissa: eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTc0MDM3MzMsImN1c3RvbWVyVXVpZCI6ImEzMDI5YjVjLWY1M2QtNDAxMS1hYjM3LWYyNDIwZjM1YzY0YiJ9.YR13ym7nM4MtqMI0LuY98hdnvDmd8pRRoNBSfzxoSEk`


- Api base url: http://localhost:1337/api

- Check [localhost:1337/admin](http://localhost:1337/admin) to see modified points result!

### - 📌 Add points
- Route: `POST /customers/add_points/:uuid`

- Payload:

  request.params:
  ```json
    "uuid": "[customer's uuid picked from any seed data]"
  ```

  request.body
  ```json
    {
      "points": "[points added]"
    }
  ```

- Response:
  ```json
  {
    "msg": "Success",
    "data": {
        "points": [number]
    }
  }
  ```

  ### - 📌 Use points
- Route: `POST /customers/use_points/:uuid`

- Payload:

  request.params:
  ```json
    "uuid": "[customer's uuid picked from any seed data]"
  ```

  request.body
  ```json
    {
      "points": "[points used]"
    }
  ```

- Response:
  ```json
  {
    "msg": "Success",
    "data": {
        "points": [number]
    }
  }
  ```
