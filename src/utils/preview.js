import path from 'path';
import mkdirp from 'mkdirp';
import convertToPDF from 'ochre-preview';

export default function createPreview(file, basePath, previewPath){
    if (/(doc|docx|ppt|pptx|xls|xlsx)$/i.test(file)) {
        let outPath = path.dirname(file.replace(basePath, previewPath));
        mkdirp.sync(outPath);
        convertToPDF(file, outPath, cb);
    } else {
        cb(undefined, `${path.extname(file)} doesn't need a preview file`);
    }
}
