const colors = {
  lime: '#C7EA46',
}

export const Styles = {
  colors,
  text: {
    defaultColor: '#464646',
    headerStyle: {
      color: '#464646',
      fontWeight: 900,
      fontSize: '40px',
      margin: '0.4em 0',
    } as React.CSSProperties,
  },
  button: {
    border: '2px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    backgroundColor: colors.lime,
  } as React.CSSProperties,
  contentItems: {
    width: '300px',
    height: '300px',
    margin: '16px',
    flexShrink: 0,
  } as React.CSSProperties,
}
