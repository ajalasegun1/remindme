export type ItemType = {
  id: number;
  title: string;
  body: string;
  date: Date;
  time: Date;
  color: string;
  pinned: boolean;
};

export type HomeType = string[];

export type RemindersItemType = {
  notification_id: string;
  id: string;
  title: string;
  body: string;
  date: string;
  time: string;
  pinned: boolean;
  backgroundColor: string;
  done: boolean;
};

export type ReminderListType = Array<{
  notification_id: string;
  id: string;
  title: string;
  body: string;
  date: string;
  time: string;
  pinned: boolean;
  backgroundColor: string;
  done: boolean;
}>;

export type EditScreenPropsType = {
  notification_id: string;
};
