/* eslint-disable no-undef */
const request = require("supertest");
const { app, http } = require("../server");
const path = require("path");
const timeout = 100000;

describe("Check if sockets do connect", () => {
	it("connects to socket", () => {
		function connect() {
			io.emit("login", { username: "test" });
			io.on("connection", (socket) => {
				console.log(socket.id);
			});
		}
		connect();
	});
});

describe("Server Endpoints", () => {
	it("should get usercount data", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/usercount");
		expect(typeof res.text).toBe("string");
	});
	it("should get usercount status", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/usercount");
		expect(res.status).toEqual(200);
	});

	it("should get messagecount data", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/messagecount");
		expect(typeof res.text).toBe("string");
	});

	it("should get messagecount status", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/messagecount");
		expect(res.status).toEqual(200);
	});
	it("should get messagelist data", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/messagelist");
		expect(typeof res.body).toBe("object");
	});

	it("should get messagecount status", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).get("/messagecount");
		expect(res.status).toEqual(200);
	});

	it("should fail to find userdata", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).post("/user/get", { username: "wew" });
		expect(res.body.length).toEqual(undefined);
	});
	it("should get userdata status", async () => {
		jest.setTimeout(timeout);
		const res = await request(app).post("/user/get", { username: "test" });
		expect(res.status).toEqual(200);
	});

	it("should create a new message (without file)", async () => {
		jest.setTimeout(timeout);
		const res = await request(app)
			.post("/message/create")
			.field("username", "testuser")
			.field("message", "test message")
			.field("time", "test time")
			.field("url", "test url");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new message (with file)", async () => {
		const destinationdir = path.resolve(__dirname, "../public/test.png");
		jest.setTimeout(timeout);
		const res = await request(app)
			.post("/message/create")
			.attach("file", destinationdir)
			.field("filename", "testfilename")
			.field("username", "testuser")
			.field("message", "test message")
			.field("time", "test time")
			.field("image", "{url:testlocation}");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new user (without file)", async () => {
		jest.setTimeout(timeout);
		const res = await request(app)
			.post("/user/create")
			.field("filename", "testfilename")
			.field("username", "testuser")
			.field("url", "testurl");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new user (with file)", async () => {
		const destinationdir = path.resolve(__dirname, "../public/test.png");
		jest.setTimeout(timeout);
		const res = await request(app)
			.post("/user/create")
			.attach("file", destinationdir)
			.field("filename", "testfilename")
			.field("username", "testuser");
		expect(res.statusCode).toEqual(200);
	});
});
