/**
 * 作者：周泓名
 * 日期：2018/6/30
 * 照片命名管理系统
 * 实现方式：
 *  1、递归遍历文件夹中的 所有文件
 *  2、打印其 内容创建时间 的 毫秒值
 */
var fs = require('fs');
var path = require('path');

// 文件源 绝对路径
var oldPath = '/Users/stevechow/Desktop/1/';
var newPath = '/Users/stevechow/Desktop/pics/';

// 总数
allNmu = 0;

/**
 * 包装 fs 的 重命名方法
 * @param {String} oldName
 * @param {String} newName
 */
var reName = (oldName, newName) => {
  fs.rename(oldName, newName, err => {
    if (err) {
      console.log('命名出错');
      return;
    }
    console.log('命名成功');
  });
};

var getFileSuffix = (name) => {
  return name.substring(name.lastIndexOf(".") + 1, name.length).toUpperCase();
}

function formatDate (date) {
  console.log(date);
  var y = date.getFullYear();
  console.log(y);
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

/**
 * 读取文件
 * 实现方式：递归
 * @param {String} filePath
 */
var fileDisplay = filePath => {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.log('读取目录出错');
      return;
    }
    files.forEach(filename => {
      var filedir = path.join(filePath, filename);
      fs.stat(filedir, (err, stats) => {
        if (err) {
          console.log('获取文件状态错误');
        } else {
          var isFile = stats.isFile();
          var isDir = stats.isDirectory();
          // 该判断里面的就是文件
          if (isFile) {
            allNmu++;
            var timeName = formatDate(stats.birthtime);
            console.log('stats >>> ', stats)
            console.log('birthtime >>> ', formatDate(stats.birthtime))

            //对图片进行复制并重命名
            var oldName = filedir;
            var newName = newPath + timeName + '-' + allNmu;
            var suffix = getFileSuffix(oldName)

            console.log('suffix >>> ', suffix)

            // 对不同的文件进行分类
            switch (suffix) {
              case 'JPG':
                newName = newName + '.JPG';
                break;

              case 'JPEG':
                newName = newName + '.JPEG';
                break;

              case 'PNG':
                newName = newName + '.PNG';
                break;

              case 'GIF':
                newName = newName + '.GIF';
                break;

              case 'HEIC':
                newName = newName + '.HEIC';
                break;

              case 'MP4':
                newName = newName + '.MP4';
                break;

              case 'MOV':
                newName = newName + '.MOV';
                break;

              case 'M4V':
                newName = newName + '.M4V';
                break;

              default:
                break;
            }
            console.log('newName >>> ', newName)
            reName(oldName, newName);
          }
          if (isDir) {
            fileDisplay(filedir);
          }
        }
      });
    });
  });
};

fileDisplay(oldPath);