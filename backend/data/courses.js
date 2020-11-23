const products = [
  {
    name: 'Introduction to Javascript',
    image: '/uploads/introductiontojavascript.jpg',
    description: 'Javascript is the most high demand in the industry nowaday.',
    instructor: 'John Doe',
    category: 'Programming',
    price: 49.99,
    rating: 5,
    numReviews: 4,
    totalSold: 1000,
    isPublished: true,
    courseContents: [
      {
        name: 'Set Up Environment',
        chapter: 'Chapter 1',
        video: '/uploads/videos/javascript/javascript_01_2020_09_10.mp4',
      },
      {
        name: 'Basic Concept',
        chapter: 'Chapter 2',
        video: '/uploads/videos/javascript/javascript_02_2020_09_10.mp4',
      },
    ],
  },
  {
    name: 'Introduction to C++',
    image: '/uploads/introductiontoc++.jpg',
    description: 'C++ is the most high demand in the industry nowaday.',
    instructor: 'John Doe',
    category: 'Programming',
    price: 20.99,
    rating: 3,
    totalSold: 201,
    numReviews: 2,
    isPublished: true,
    courseContents: [
      {
        name: 'Set Up Environment',
        chapter: 'Chapter 1',
        video: '/uploads/videos/cplusplus/cplusplus_01_2020_09_10.mp4',
      },
      {
        name: 'Basic Concept',
        chapter: 'Chapter 2',
        video: '/uploads/videos/cplusplus/cplusplus_02_2020_09_10.mp4',
      },
      {
        name: 'Advance Concept',
        chapter: 'Chapter 3',
        video: '/uploads/videos/cplusplus/cplusplus_03_2020_09_10.mp4',
      },
    ],
  },
  {
    name: 'Introduction to Typescript',
    image: '/uploads/introductiontotypescript.jpg',
    description: 'Typescript is the most high demand in the industry nowaday.',
    instructor: 'John Doe',
    category: 'Programming',
    price: 22.99,
    rating: 1,
    totalSold: 10,
    numReviews: 4,
    isPublished: true,
    courseContents: [
      {
        name: 'Set Up Visual Code',
        chapter: 'Chapter 1',
        video: '/uploads/videos/typescript/typescript_01_2020_09_10.mp4',
      },
      {
        name: 'Basic Concept of Typescript',
        chapter: 'Chapter 2',
        video: '/uploads/videos/typescript/typescript_02_2020_09_10.mp4',
      },
    ],
  },
  {
    name: 'Introduction to Python',
    image: '/uploads/introductiontopython.jpg',
    description: 'Python is the most high demand in the industry nowaday.',
    instructor: 'John Doe',
    category: 'Programming',
    price: 10.99,
    rating: 4.5,
    totalSold: 0,
    numReviews: 4,
    isPublished: false,
    courseContents: [
      {
        name: 'Set Up Python Environment',
        chapter: 'Chapter 1',
        video: '/uploads/videos/python/python_01_2020_09_10.mp4',
      },
      {
        name: 'Basic Concept',
        chapter: 'Chapter 2',
        video: '/uploads/videos/python/python_02_2020_09_10.mp4',
      },
    ],
  },
  {
    name: 'Learn HTML CSS To Build A Webpage',
    image: '/uploads/learnhtmlcsstobuildawebpage.jpg',
    description: 'HTML CSS is the most high demand in the industry nowaday.',
    instructor: 'Brad',
    category: 'Programming',
    price: 10.99,
    rating: 4.5,
    numReviews: 4,
    totalSold: 20100,
    isPublished: true,
    courseContents: [
      {
        name: 'Start Build!',
        chapter: 'Chapter 1',
        video: '/videos/html_css.mp4',
      },
      {
        name: 'Extra Content!',
        chapter: 'Chapter 2',
        video: '/videos/html_css_2.mp4',
      },
    ],
  },
]

export default products
