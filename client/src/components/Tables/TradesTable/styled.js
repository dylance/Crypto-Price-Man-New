import styled from 'styled-components';

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  padding-top: 80px;
  margin: auto;
  max-width: 1555px;

  & div {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0 auto;

  th,
  td {
    text-align: center;
    padding: 12px 4px;
    font-size: 18px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;
