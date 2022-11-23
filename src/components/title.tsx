import { motion } from 'framer-motion';
import { useState } from 'react';

import { CloseIcon, EditIcon } from './icons';

export interface TitleProps {
  defaultTitle: string;
  hide: boolean;
  onSelected: () => void;
}

export const Title: React.FC<TitleProps> = ({
  defaultTitle,
  hide,
  onSelected,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [titleSelected, setTitleSelected] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editTitleMode, setEditTitleMode] = useState(false);
  const titleCtainerMotion = !hide
    ? titleSelected
      ? {
          display: 'flex',
          height: '90vh',
        }
      : {
          diplay: 'block',
          height: 'auto',
        }
    : {
        height: '0px',
      };

  function handleTitleClick() {
    setTitleSelected((prev) => !prev);
    onSelected();
  }

  return (
    <>
      <motion.div animate={titleCtainerMotion} className="titleContainer">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {editTitleMode ? (
            <>
              <input
                className="inputs"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="buttons button-close"
                onClick={() => setEditTitleMode(false)}
              >
                <CloseIcon />
              </button>
            </>
          ) : (
            <>
              <h1
                className="title"
                onClick={handleTitleClick}
                onMouseOver={() => setEditTitle(true)}
                onMouseLeave={() => setEditTitle(false)}
              >
                {title}
              </h1>
              {editTitle && (
                <button
                  className="buttons button-edit"
                  onClick={() => setEditTitleMode(true)}
                  onMouseOver={() => setEditTitle(true)}
                  onMouseLeave={() => setEditTitle(false)}
                >
                  <EditIcon />
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};
