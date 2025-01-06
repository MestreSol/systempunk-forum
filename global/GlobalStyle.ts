import { createGlobalStyle } from 'styled-components'
import Theme from './Theme'

// Fonts
const Fonts = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inclusive+Sans:ital@0;1&display=swap');
`

const InclusiveSans = `
    .inclusive-sans-regular {
        font-family: ${Theme.fontFamily.InclusiveSans};
        font-weight: 400;
        font-style: normal;
    }

    .inclusive-sans-regular-italic {
        font-family: ${Theme.fontFamily.InclusiveSans};
        font-weight: 400;
        font-style: italic;
    }
`
const BarlowCondensed = `
    .barlow-condensed-thin {
        font-family: ${Theme.fontFamily.BarlowCondensed};
        font-weight: 100;
        font-style: normal;
    }

  .barlow-condensed-extralight {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 200;
    font-style: normal;
  }

  .barlow-condensed-light {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 300;
    font-style: normal;
  }

  .barlow-condensed-regular {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 400;
    font-style: normal;
  }

  .barlow-condensed-medium {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 500;
    font-style: normal;
  }

  .barlow-condensed-semibold {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 600;
    font-style: normal;
  }

  .barlow-condensed-bold {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 700;
    font-style: normal;
  }

  .barlow-condensed-extrabold {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 800;
    font-style: normal;
  }

  .barlow-condensed-black {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 900;
    font-style: normal;
  }

  .barlow-condensed-thin-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 100;
    font-style: italic;
  }

  .barlow-condensed-extralight-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 200;
    font-style: italic;
  }

  .barlow-condensed-light-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 300;
    font-style: italic;
  }

  .barlow-condensed-regular-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 400;
    font-style: italic;
  }

  .barlow-condensed-medium-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 500;
    font-style: italic;
  }

  .barlow-condensed-semibold-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 600;
    font-style: italic;
  }

  .barlow-condensed-bold-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 700;
    font-style: italic;
  }

  .barlow-condensed-extrabold-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 800;
    font-style: italic;
  }

  .barlow-condensed-black-italic {
    font-family: ${Theme.fontFamily.BarlowCondensed};
    font-weight: 900;
    font-style: italic;
  }`

export const GlobalStyle = createGlobalStyle`
    ${Fonts}

    ${InclusiveSans}
    ${BarlowCondensed}

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        overflow-x: hidden;

    }

    body {
        margin: 0;
        padding: 0;
        background-color: #1e1e1e;
    }



`
