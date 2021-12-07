import styled from 'styled-components';

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 800px;

  th,
  td {
    text-align: left;
    padding: 10px;
    font-size: 24px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

export const AssetNameWrapper = styled.div`
  display: flex;

  a {
    text-decoration: none;
    color: grey;
  }

  & > div:nth-child(1) {
    display: flex;

    img {
      margin: auto;
    }
  }

  div:nth-child(2) {
    padding-left: 20px;
    padding-right: 40px;
  }
`;
