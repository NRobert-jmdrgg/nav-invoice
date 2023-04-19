/**
 * alap típusok a nav operációkhoz
 */

export type BasicHeader = {
  requestId: string; // A kérés egyedi azonosítója
  timestamp: string; // A kérés kliensoldali időpontja UTC-ben
  requestVersion: string; // A kérés verziószáma
  headerVersion?: string; // A header verziószáma
};

type Notification = {
  notificationCode: string; // Értesítés kód
  notificationText: string; // Értesítés szöveg
};

type Notifications = {
  notification: Notification[];
};

export type BasicResult = {
  funcCode: string; // A feldolgozás eredménye
  errorCode?: string; // A feldolgozás hibakódja
  message?: string; // A feldolgozási eredményhez vagy hibakódhoz tartozó szöveges üzenet
  notifications: Notifications;
};
