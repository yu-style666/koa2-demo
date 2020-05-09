const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");

/**
 * 同步创建文件目录 (洋葱模型)
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  }

  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
};

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
const getSuffixName = (fileName) => {
  const nameList = fileName.split(".");
  return nameList[nameList.length - 1];
};

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
const uploadFile = (ctx, options) => {
  const { req } = ctx;
  const busboy = new Busboy({ headers: req.headers });

  // 获取类型
  const fileType = options.fileType || "common";
  const filePath = path.join(options.path, fileType);

  mkdirsSync(filePath);

  return new Promise((resolve, reject) => {
    console.log("文件上传中...");
    const result = {
      success: false,
      message: "",
      data: null,
    };

    // 解析请求文件事件
    busboy.on("file", (
      fieldname,
      file,
      filename /* , encoding, mimetype */
    ) => {
      const fileName =
        Math.random().toString(16).substr(2) + "." + getSuffixName(filename);
      const _uploadFilePath = path.join(filePath, fileName);
      const saveTo = path.join(_uploadFilePath);

      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(saveTo));

      file.on("end", () => {
        result.success = true;
        result.message = "文件上传成功";
        result.data = {
          pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`,
        };

        console.log("文件上传成功！");

        resolve(result);
      });
    });

    // 解析结束事件
    busboy.on("finish", () => {
      console.log("文件上结束");
      resolve(result);
    });

    // 解析错误事件
    busboy.on("error", (err) => {
      console.log("文件上出错", err);
      reject(result);
    });

    req.pipe(busboy);
  });
};

module.exports = { uploadFile };
