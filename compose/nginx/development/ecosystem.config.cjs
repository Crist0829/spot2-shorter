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
      }
    ]
  }

  
  