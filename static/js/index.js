(() => {
  const btn = document.getElementById("J_UploadPictureBtn");
  const progressElem = document.getElementById("J_UploadProgress");
  const previewElem = document.getElementById("J_PicturePreview");

  /**
   * 类型判断
   * @type {Object}
   */
  const UtilType = {
    isPrototype(data) {
      return Object.prototype.toString.call(data).toLowerCase();
    },

    isJSON(data) {
      return this.isPrototype(data) === "[object object]";
    },

    isFunction(data) {
      return this.isPrototype(data) === "[object function]";
    },
  };

  /**
   * form表单上传请求事件
   * @param  {object} options 请求参数
   */
  const requestEvent = (options) => {
    try {
      const { formData } = options;
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          options.success(JSON.parse(xhr.responseText));
        }
      };

      xhr.upload.onprogress = (evt) => {
        const { loaded } = evt;
        const tot = evt.total;
        const per = Math.floor((100 * loaded) / tot);
        options.progress(per);
      };
      xhr.open("post", "/api/picture/upload.json");
      xhr.send(formData);
    } catch (err) {
      options.fail(err);
    }
  };

  /**
   * 上传事件
   * @param  {object} options 上传参数
   */
  const uploadEvent = (options) => {
    let file;
    const formData = new FormData();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "files");

    input.click();
    input.onchange = () => {
      [file] = input.files;
      formData.append("files", file);

      requestEvent({
        formData,
        success: options.success,
        fail: options.fail,
        progress: options.progress,
      });
    };
  };

  /**
   * 上传操作
   * @param  {object} options 上传参数
   */
  const uploadAction = (options) => {
    if (!UtilType.isJSON(options)) {
      console.log("upload options is null");
      return;
    }
    const _options = {};
    _options.success = UtilType.isFunction(options.success)
      ? options.success
      : () => {};
    _options.fail = UtilType.isFunction(options.fail) ? options.fail : () => {};
    _options.progress = UtilType.isFunction(options.progress)
      ? options.progress
      : () => {};

    uploadEvent(_options);
  };

  btn.addEventListener("click", () => {
    uploadAction({
      success(result) {
        console.log(result);
        if (result && result.success && result.data && result.data.pictureUrl) {
          previewElem.innerHTML = `<img src="${result.data.pictureUrl}" style="max-width: 100%">`;
        }
      },
      progress(data) {
        if (data && data * 1 > 0) {
          progressElem.innerText = data;
        }
      },
    });
  });
})();
