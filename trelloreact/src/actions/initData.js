export const initData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column1', 'column2', 'column3'],
      columns: [
        {
          id: 'column1',
          boardId: 'board-1',
          title: 'Todo',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover: 'https://imgs.search.brave.com/UwqyTvQWl82NmIKWCMUsQYa9xGcYrWizMJeFlvH-PcU/rs:fit:770:514:1/g:ce/aHR0cHM6Ly93d3cu/ZmxpcHBpbmdoZWNr/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNy9ob3ct/dG8tZ2V0LW1vdGl2/YXRlZC5qcGc',
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null,
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null,
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 4',
              cover: null,
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 5',
              cover: null,
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 6',
              cover: null,
            },
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 7',
              cover: null,
            },
            
          ],
        },
        //COLUMN 2
        {
          id: 'column2',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-9', 'card-8', 'card-10'],
          cards: [
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 8',
              cover: null,
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 9',
              cover: null,
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 10',
              cover: null,
            },
            
            
          ],
        },
        {
          id: 'column3',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-11', 'card-12', 'card-13'],
          cards: [
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 11',
              cover: null,
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 12',
              cover: null,
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 13',
              cover: null,
            },
            
            
          ],
        },
      ],
    },
  ],
};
