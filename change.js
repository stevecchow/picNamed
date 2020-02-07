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
var oldPath = '/Users/stevechow/Desktop/TM/';
// var oldPath = '/Volumes/LaCie/pictrue/pics/';

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

/**
 * 读取文件
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
                        var timeName = stats.birthtime.toLocaleString();
                        console.log(stats.birthtime.toLocaleString());

                        //对图片进行复制并重命名
                        var oldName = filedir;
                        var newName = oldPath + timeName + '-' + allNmu;

                        // 对不同的文件进行分类
                        if (oldName.indexOf('jpg') !== -1) {
                            newName = newName + '.jpg';
                            // console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('jpeg') !== -1) {
                            newName = newName + '.jpg';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('JPG') !== -1) {
                            newName = newName + '.jpg';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('png') !== -1) {
                            newName = newName + '.png';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('PNG') !== -1) {
                            newName = newName + '.png';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('gif') !== -1) {
                            newName = newName + '.gif';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('mp4') !== -1) {
                            newName = newName + '.mp4';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('mov') !== -1) {
                            newName = newName + '.mov';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }

                        if (oldName.indexOf('m4v') !== -1) {
                            newName = newName + '.m4v';
                            console.log(newName);
                            reName(oldName, newName);
                            return;
                        }
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
