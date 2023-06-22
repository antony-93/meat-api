module.exports = {
  apps : [{
    name   : "meat-api",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster"
  }]
}
