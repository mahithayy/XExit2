describe("Backend API Tests for Employee and Admin Role", () => {
  const apiUrl = "https://xexit-1-mapu.onrender.com/api";

  let employeeResignationId = null;
  let employeeUsername = `emp_${Date.now()}`;
  const employeePassword = "emp4";

  let employeeToken = "";
  let adminToken = "";

  // Employee registration and login
  it("should register a new employee", () => {
    cy.request("POST", `${apiUrl}/auth/register`, {
      username: employeeUsername,
      password: employeePassword,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("message", "User registered successfully");
    });
  });

  it("should login the employee with valid credentials", () => {
    cy.request("POST", `${apiUrl}/auth/login`, {
      username: employeeUsername,
      password: employeePassword,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      employeeToken = `Bearer ${response.body.token}`;
    });
  });

  it("should submit resignation for the employee", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/user/resign`,
      headers: {
        Authorization: employeeToken,
      },
      body: {
        lwd: "2024-12-26",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      employeeResignationId = response.body.data.resignation._id;
    });
  });

  // Admin login
  it("should login as admin (HR)", () => {
    cy.request("POST", `${apiUrl}/auth/login`, {
      username: "admin",
      password: "admin",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      adminToken = `Bearer ${response.body.token}`;
    });
  });

  // Admin views resignations
  it("should view all resignations submitted by employees", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/admin/resignations`,
      headers: {
        Authorization: adminToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");
    });
  });

  // Admin approves resignation
  it("should approve the employee’s resignation", () => {
    cy.request({
      method: "PUT",
      url: `${apiUrl}/admin/conclude_resignation`,
      headers: {
        Authorization: adminToken,
      },
      body: {
        resignationId: employeeResignationId,
        approved: true,
        lwd: "2024-12-26",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Employee submits questionnaire
  it("should allow the employee to submit responses to exit questionnaire", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/user/responses`,
      headers: {
        Authorization: employeeToken,
      },
      body: {
        responses: [
          {
            questionText: "What prompted you to start looking for another job?",
            response: "Lack of career growth opportunities",
          },
          {
            questionText: "Would you recommend this company to others?",
            response: "Yes, with some reservations",
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Admin views questionnaire responses
  it("should allow the admin to view all questionnaire responses", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/admin/exit_responses`,
      headers: {
        Authorization: adminToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");

      const expectedResponses = [
        {
          questionText: "What prompted you to start looking for another job?",
          response: "Lack of career growth opportunities",
        },
        {
          questionText: "Would you recommend this company to others?",
          response: "Yes, with some reservations",
        },
      ];

      const hasExpectedResponses = response.body.data.some((item) => {
        return (
          item.responses.length === expectedResponses.length &&
          item.responses.every((resp, index) => {
            return (
              resp.questionText === expectedResponses[index].questionText &&
              resp.response === expectedResponses[index].response
            );
          })
        );
      });

      expect(hasExpectedResponses).to.be.true;
    });
  });
});
