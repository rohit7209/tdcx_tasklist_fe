import styled from 'styled-components';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const constants = {
  size: {
    DEFAULT: '14px',
    SIZE_6: '11px',
    SIZE_5: '14px',
    SIZE_4: '16px',
    SIZE_3: '20px',
    SIZE_2: '28px',
    SIZE_1: '32px',
    SIZE_0: '60px',
  },
  type: {
    THIN: '100',
    EXTRA_LIGHT: '200',
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700',
    EXTRA_BOLD: '800',
    BLACK: '900',
  },
};

const typeBasedFont = ({ type, fontFamily }) => {
  if (fontFamily) return fontFamily;
  switch (type) {
    default:
      return fonts.MONTSERRAT;
  }
};

const defaultStyle = ({ color = colors.DEFAULT, type = constants.type.REGULAR, fontFamily, align = 'left', size }) => `
  color: ${color};
  font-family: ${typeBasedFont({ type, fontFamily })};
  text-align: ${align};
  ${size ? `font-size: ${size}` : ''};
`;

const defaultHeadStyle = ({ color = colors.TEXT_STRONG }) => `
  font-weight: 500;
  margin: 0;
  color: ${color};
`;

const H1 = styled.h1`
  ${defaultStyle}
  ${defaultHeadStyle}
`;

const H2 = styled.h2`
  ${defaultStyle}
  ${defaultHeadStyle}
`;

const H3 = styled.h3`
  ${defaultStyle}
  ${defaultHeadStyle}
`;

const H4 = styled.h4`
  ${defaultStyle}
  ${defaultHeadStyle}
`;

const H5 = styled.h5`
  ${defaultStyle}
  ${defaultHeadStyle}
`;

const Para = styled.p`
  ${defaultStyle}
`;

const Small = styled.p`
  ${defaultStyle}
  font-size: ${({ size: s = constants.size.SIZE_5 }) => s};
`;

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  Para,
  Small,
  constants,
};
