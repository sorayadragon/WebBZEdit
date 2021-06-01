import React, {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
  useState,
  SyntheticEvent,
} from 'react';

import { IBase } from '../../../Document/Obstacles/Base';
import { IBaseObject } from '../../../Document/Obstacles/BaseObject';
import { classList } from '../../../Utilities/cssClasses';

import thumbBaseBlue from '../../../assets/thumb_base_blue.png';
import thumbBaseGreen from '../../../assets/thumb_base_green.png';
import thumbBasePurple from '../../../assets/thumb_base_purple.png';
import thumbBaseRed from '../../../assets/thumb_base_red.png';
import thumbBox from '../../../assets/thumb_box.png';
import thumbPyramid from '../../../assets/thumb_pyramid.png';
import styles from './ObstacleSummary.module.scss';

interface Props {
  obstacle: IBaseObject;
  onClick: (event: MouseEvent, obstacle: IBaseObject) => void;
  selected: boolean;
}

const obstacleThumbs: Record<string, string> = {
  base: '',
  box: thumbBox,
  pyramid: thumbPyramid,
};

const baseThumbs: Record<IBase['color'], string> = {
  1: thumbBaseRed,
  2: thumbBaseGreen,
  3: thumbBaseBlue,
  4: thumbBasePurple,
};

function getThumbnail(object: IBaseObject): JSX.Element {
  const { _objectType: type } = object;

  if (obstacleThumbs[type] !== undefined) {
    let src = obstacleThumbs[type];

    if (type === 'base') {
      src = baseThumbs[(object as IBase).color];
    }

    return (
      <img className={styles.thumbnail} src={src} alt={`${type} thumbnail`} />
    );
  }

  return <span className={styles.empty} />;
}

const ObstacleSummary = forwardRef<HTMLDivElement, Props>(
  ({ obstacle, onClick, selected }: Props, ref) => {
    const [editMode, setEditMode] = useState(false);
    const [nameEdit, setNameEdit] = useState(obstacle.name ?? '');
    const displayName =
      obstacle.name ?? `${obstacle._objectType} ${obstacle._uuid.substr(0, 8)}`;
    const classes = classList([
      styles.wrapper,
      [styles.selected, selected],
      [styles.editMode, selected],
    ]);

    const handleDoubleClick = () => {
      // @TODO: Enable `editMode` when it's double clicked
    };
    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
      // @TODO: When the input box looses focus, persist the new name in
      //    `nameEdit` to the BZW document in global state.
    };
    const handleOnNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
      setNameEdit(e.currentTarget.value);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // @TODO: When ESC is hit, disable `editMode`
      // @TODO: When Enter is hit, persist the new name in `nameEdit` to the BZW
      //    document in global state.
    };

    return (
      <div
        ref={ref}
        className={classes}
        onClick={(event) => onClick(event, obstacle)}
        onDoubleClick={handleDoubleClick}
      >
        <div>{getThumbnail(obstacle)}</div>
        <div className={styles.body}>{displayName}</div>
        <input
          type="text"
          className={styles.editor}
          onBlur={handleOnBlur}
          onChange={handleOnNameChange}
          onKeyDown={handleKeyDown}
          value={nameEdit}
        />
      </div>
    );
  },
);

export default ObstacleSummary;
