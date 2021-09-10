export function askNotificationPermission() {
  // check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    Notification.requestPermission().then((permission) => {
      console.log({ currentPermission: permission });
    });
  }
}
