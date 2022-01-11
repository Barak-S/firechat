import React, { useState } from 'react';
import { makeStyles, TextareaAutosize, FormControl } from '@material-ui/core';
import classNames from 'classnames';

const TextArea = ({ onChange, name, value, resize = true, className, style }) => {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);
  const isActive = focus || value;

  function handleChange(e) {
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <FormControl style={style}>
      <label
        htmlFor={'textAreaId'}
        className={classNames(classes.container, isActive && classes.focusedArea, className)}
        style={style}
      >
        <TextareaAutosize
          name={name}
          id={'textAreaId'}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          className={classes.textArea}
          value={value}
          style={{ overflow: 'auto', resize: resize ? 'vertical' : 'none' }}
        />
      </label>
    </FormControl>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    position: 'relative',
    padding: 8,
    background: '#fff',
    cursor: 'text',
    marginBottom: 2,
    borderRadius: 8
  },
  textArea: {
    width: '100%',
    minHeight: 65,
    maxHeight: 255,
    height: '100%',
    fontSize: 16,
    background: 'transparent',
    fontFamily: 'Montserrat, sans-serif',
    border: 'none',
    outline: 'none',
  },
  focusedArea: {},
}));

export default TextArea;
