// 测试用例
// 输入 ./node_modules/.bin/mocha 执行测试用例

const supertest = require("supertest");
const { expect } = require("chai");

const app = require("../demo18");

const request = supertest(app.listen());

// 测试套件/组
describe("开始测试 demo 的 GET 请求", () => {
  it("测试 /getString.json 请求", (done) => {
    request
      .get("/getString.json")
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为 object 类型
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("string");
        done();
      });
  });

  it("测试 /getNumber.json 请求", (done) => {
    request
      .get("/getNumber.json")
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("number");
        done();
      });
  });
});

describe("开始测试 demo 的 POST 请求", () => {
  it("测试 /postData.json 请求", (done) => {
    request
      .post("/postData.json")
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("string");
        done();
      });
  });
});
