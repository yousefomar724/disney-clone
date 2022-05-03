import {
  FastForwardIcon,
  FilmIcon,
  HomeIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'

export default {
  headerData: {
    logo: { img: '/images/logo.svg', title: 'Disney+' },
    links: [
      {
        id: 1,
        icon: HomeIcon,
        text: 'Home',
        route: '/',
      },
      {
        id: 2,
        icon: FilmIcon,
        text: 'Watchlist',
        route: '/watchlist',
      },
      {
        id: 3,
        icon: VideoCameraIcon,
        text: 'Movies',
        route: '/movies',
      },
      {
        id: 4,
        icon: FastForwardIcon,
        text: 'TV Shows',
        route: '/shows',
      },
    ],
  },
  heroData: {
    sliderData: [
      {
        id: 1,
        img: '/images/slider-1.jpg',
        title: '',
        url: '',
      },
      {
        id: 2,
        img: '/images/slider-2.jpg',
        title: '',
        url: '',
      },
      {
        id: 3,
        img: '/images/slider-3.jpg',
        title: '',
        url: '',
      },
      {
        id: 4,
        img: '/images/slider-4.jpeg',
        title: '',
        url: '',
      },
    ],
    brandsData: [
      {
        id: 1,
        img: '/images/disnep.png',
        video: '/videos/disney.mp4',
        title: 'Disney',
        url: 'https://www.disney.com',
      },
      {
        id: 2,
        img: '/images/marvel.png',
        video: '/videos/marvel.mp4',
        title: 'Marvel',
        url: 'https://www.marvel.com',
      },
      {
        id: 3,
        img: '/images/national-geographic.png',
        video: '/videos/national-geographic.mp4',
        title: 'National Geographic',
        url: 'https://www.nationalgeographic.com',
      },
      {
        id: 4,
        img: '/images/pixar.png',
        video: '/videos/pixar.mp4',
        title: 'Pixar',
        url: 'https://www.pixar.com',
      },
      {
        id: 5,
        img: '/images/starwars.png',
        video: '/videos/star-wars.mp4',
        title: 'Star Wars',
        url: 'https://www.starwars.com',
      },
    ],
  },
  moviesData: {
    tabs: [
      {
        id: 1,
        text: 'Popular',
      },
      {
        id: 2,
        text: 'Top Rated',
      },
      {
        id: 3,
        text: 'Upcoming',
      },
    ],
  },
  showsData: {
    tabs: [
      {
        id: 1,
        text: 'Popular',
      },
      {
        id: 2,
        text: 'Top Rated',
      },
    ],
  },
  footerData: [
    [
      {
        text: 'Home',
        route: '/',
      },
      {
        text: 'Contact',
        route: '/',
      },
      {
        text: 'Terms',
        route: '/',
      },
      {
        text: 'About us',
        route: '/',
      },
    ],
    [
      {
        text: 'FAQ',
        route: '/',
      },
      {
        text: 'Premium',
        route: '/',
      },
      {
        text: 'Privacy Policy',
        route: '/',
      },
      {
        text: 'Live',
        route: '/',
      },
    ],
    [
      {
        text: 'Must watch',
        route: '/',
      },
      {
        text: 'Recent release',
        route: '/',
      },
      {
        text: 'Top IMDB',
        route: '/',
      },
    ],
  ],
}
