const Serve = require('oss-serve');
const public_dir = hexo.config.public_dir || './public';

hexo.extend.deployer.register('oss', ({
  accessKeyId,
  accessKeySecret,
  bucket,
  region,
  destination = '/',
  baseUrl
} = {}) => {

  if (!accessKeySecret || !accessKeyId || !bucket || !region) {
    let help = '';

    help += 'You have to configure the deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: oss\n';
    help += '    accessKeyId: <your accessKeyId>\n';
    help += '    accessKeySecret: <your accessKeySecret>\n';
    help += '    bucket: <the bucket you want to serve the site>\n';
    help += '    region: <the region of your bucket>\n';
    help += 'For more help, you can check the docs: ' + chalk.underline('http://hexo.io/docs/deployment.html');

    console.log(help);
    return;
  }

  const serve = new Serve({
    oss: {
      accessKeyId,
      accessKeySecret,
      bucket,
      region
    },
    destination,
    baseUrl
  });

  return serve.push(public_dir);
});