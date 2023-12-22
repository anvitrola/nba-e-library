import styled from 'styled-components'

export const FooterContainer = styled.section`
    z-index: 100;
    grid-area: footer;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h5, h6, p {
        color: var(--white);
    }
`