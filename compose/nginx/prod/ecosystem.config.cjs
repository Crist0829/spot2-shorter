module.exports = {
  apps: [
    {
      name: "queue-default",
      script: "artisan",
      args: "queue:work",
      interpreter: "php",
    },
    {
      name: "queue-broadcasts",
      script: "artisan",
      args: "queue:work --queue=broadcasts",
      interpreter: "php",
    },
    {
      name: "url-analysis-consumer",
      script: "artisan",
      args: "urls:process-analysis-results",
      interpreter: "php",
      autorestart: true,
      watch: false,
      restart_delay: 5000,
    }
  ]
}
