const colors = {
  lime: '#C7EA46',
  limeDark: '#C0E038',
}

const common = {
  fillCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  } as React.CSSProperties,
}

export const Styles = {
  colors,
  common,
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
  } as React.CSSProperties,
  contentItems: {
    width: '300px',
    height: '300px',
    margin: '16px',
    flexShrink: 0,
  } as React.CSSProperties,
}
