import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 420px;
  min-height: 400px
  box-shadow: 4px 1px 1px 9px black;
  display: flex;
  flex-direction: column;
  background-image: url(./background.jpeg); 
`;

export const Title = styled.h3`
  padding: 8px;
  background-color: rgb(0, 2, 71);
  color: white;
  display: flex
  direction: space-between;
  border-radius: 23px 28px 
  box-shadow: 3px 5px 5px 4px black;
`;

export const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'LightGray' : 'white')};
  flex-grow: 1;
  min-height: 100px;
  background-image: url(./background.jpeg);
`;

export const Button = styled.button`
background-color: #4CAF50; /* Green */
border: none;
border-radius: 15px;
color: white;
font-size: 6px;
text-align: center;
margin-right: 2px;
`