export const commentData = [
  {
    id: "c0",
    name: "Chandler",
    comment: "Hello world! How are you?",
    commentedOn: new Date("2023-10-13T08:30:00"), // Example timestamp, replace with your own
    replies: [
      {
        id: "c2",
        name: "Monica",
        comment: "Hey, I am fine, wbu?",
        commentedOn: new Date("2023-10-13T09:00:00"), // Example timestamp, replace with your own
        replies: [],
      },
      {
        id: "c3",
        name: "Rachel",
        comment: "Hello, I am good. How are you?",
        commentedOn: new Date("2023-10-13T09:30:00"), // Example timestamp, replace with your own
        replies: [],
      },
    ],
  },
  // {
  //   id: "c1",
  //   name: "Chandler",
  //   comment: "Hello world! How are you?",
  //   commentedOn: new Date("2023-10-13T10:00:00") ,// Example timestamp, replace with your own
  //   replies: [
  //     {
  //       id: "c4",
  //       name: "Monica",
  //       comment: "Hey, I am fine, wbu?",
  //       commentedOn: new Date("2023-10-13T10:30:00"), // Example timestamp, replace with your own
  //       replies: [],
  //     },
  //     {
  //       id: "c5",
  //       name: "Rachel",
  //       comment: "Hello, I am good. How are you?",
  //       commentedOn: new Date("2023-10-13T11:00:00"), // Example timestamp, replace with your own
  //       replies: [],
  //     },
  //     {
  //       id: "c6",
  //       name: "Rachel",
  //       comment: "Hello, I am good. How are you?",
  //       commentedOn: new Date("2023-10-13T11:30:00") ,// Example timestamp, replace with your own
  //       replies: [],
  //     },
  //   ],
  // },
];
