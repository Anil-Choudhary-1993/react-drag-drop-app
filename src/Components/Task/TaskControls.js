import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  border-style: none inset solid double;
  text-transform : capitalize;
  box-shadow: 2px 2px;
  &:hover {
    transition-delay: .2s;
    text-shadow: 0 2px 3px #FF0000, 0 0 5px #0000FF;
  }
  border-left: 26px solid rgb(0,2,71);
  cursor : ${props => props.isDragDisabled ? 'no-drop' : 'grab'}
  background-color: ${props =>
    props.isDragDisabled
      ? 'Orange'
      : props.isDragging
        ? 'YellowGreen'
        : 'white'};
`;

export const TaskContainer = styled.div``

export const DeleteButton = styled.button`
list-style-type: none;
background-color: white;
border: none;
border-radius: 4px;
text-align: center
float: right
margin-bottom: 6px
`

export const Icon = styled.i`
font-size: 18px`