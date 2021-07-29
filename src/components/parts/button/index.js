import React from 'react'

const Button = ({children, ...attrs}) => (
	<button {...attrs}>{children}</button>
)

export default Button