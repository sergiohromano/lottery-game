import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { BallType } from './../types';
import { useBeforeLeave } from './../utils/useBeforeLeave';
import { CloseIcon, EditIcon, ResetIcon } from './icons';

const createArray = (max: number, min: number): Array<BallType> =>
  Array.from({ length: max - min + 1 }).map((_, i) => ({
    value: min + i,
    selected: false,
  }));

export interface GridProps {
  defaulttMinNumber?: number;
  defaultMaxNumber?: number;
  hide: boolean;
  onSelected: () => void;
}

export const Grid: React.FC<GridProps> = ({
  defaulttMinNumber = 1,
  defaultMaxNumber = 90,
  hide,
  onSelected,
}) => {
  const [minNumber, setMinNumber] = useState(defaulttMinNumber);
  const [maxNumber, setMaxNumber] = useState(defaultMaxNumber);
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState('#008000');
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
  const [selectedBackgroundWindowColor, setSelectedBackgroundWindowColor] =
    useState('#008000');
  const [selectedTextWindowColor, setSelectedTextWindowColor] =
    useState('#ffffff');
  const [seconds, setSeconds] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [numbers, setNumbers] = useState<Array<BallType>>([]);
  const [selectedBall, setSelectedBall] = useState<BallType | null>();
  const isSelected = selectedBall && !selectedBall.selected;
  const appMotion = !hide
    ? !isSelected
      ? {
          backgroundColor: 'white',
          borderRadius: '3rem',
          display: 'block',
        }
      : {
          backgroundColor: selectedBackgroundWindowColor,
          color: selectedTextWindowColor,
          borderRadius: '3rem',
          display: 'block',
        }
    : {
        display: 'none',
      };
  const selectedMotion = isSelected
    ? {
        opacity: 1,
      }
    : {
        opacity: 0,
      };
  const gridMotion = !isSelected
    ? {
        display: 'grid',
      }
    : {
        display: 'none',
      };

  const onReset = () => {
    const confirmation = confirm('Está seguro de reiniciar el juego?');
    if (confirmation) {
      handleReset();
    }
  };

  const onEdit = () => {
    setShowEditMode(true);
  };

  const handleReset = () => {
    setNumbers((prev: Array<BallType>) =>
      prev.map((num) => {
        num.selected = false;
        return num;
      })
    );
  };

  useBeforeLeave({
    hasUnsavedChanges: numbers.filter((x) => x.selected).length > 0,
    warningText: 'Estás seguro de salir?',
  });

  useEffect(() => {
    if (selectedBall) {
      if (!selectedBall.selected) onSelected();
      const updateList = numbers.map((item: BallType) => ({
        ...item,
        selected:
          item.value === selectedBall.value ? !item.selected : item.selected,
      }));
      setNumbers(updateList);
      setTimeout(() => {
        if (!selectedBall.selected) onSelected();
        setSelectedBall(null);
      }, seconds * 1000);
    }
  }, [selectedBall]);

  useEffect(() => {
    if (
      numbers.length === 0 ||
      numbers[0].value !== minNumber ||
      numbers[numbers.length - 1].value !== maxNumber
    ) {
      const arrayNumbers = createArray(maxNumber, minNumber);
      setNumbers(arrayNumbers);
    }
  }, [minNumber, maxNumber]);

  return (
    <>
      <motion.div animate={appMotion} className="app">
        <motion.div animate={selectedMotion} className="selectedContainer">
          <div className="selected">{selectedBall?.value}</div>
        </motion.div>

        <motion.div animate={gridMotion} className="container">
          {numbers.map((x: BallType) => (
            <div
              key={x.value}
              style={{
                backgroundColor: x.selected ? selectedBackgroundColor : 'white',
                color: x.selected ? selectedTextColor : 'black',
              }}
              className="ball"
              onClick={() => {
                if (!showEditMode) {
                  setSelectedBall(x);
                }
              }}
            >
              {x.value}
            </div>
          ))}
        </motion.div>
      </motion.div>
      {!showEditMode && (
        <motion.div
          animate={{
            display: selectedBall && !selectedBall.selected ? 'none' : 'block',
          }}
          style={{ textAlign: 'center' }}
        >
          {showActions && (
            <button
              className="buttons button-edit"
              onClick={onEdit}
              onMouseOver={() => setShowActions(true)}
              onMouseLeave={() => setShowActions(false)}
            >
              <EditIcon />
            </button>
          )}
          <button
            className="buttons button-reset"
            onClick={onReset}
            onMouseOver={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            <ResetIcon />
          </button>
        </motion.div>
      )}
      {showEditMode && (
        <div style={{ textAlign: 'center' }}>
          <div>
            <label>Segundos:</label>
            <input
              type="number"
              name="seconds"
              value={seconds}
              onChange={(e) => setSeconds(+e.target.value)}
            />
          </div>
          <div>
            <label>Número mínimo:</label>
            <input
              type="number"
              name="minNumber"
              value={minNumber}
              onChange={(e) => setMinNumber(+e.target.value)}
            />
          </div>
          <div>
            <label>Número máximo:</label>
            <input
              type="number"
              name="maxNumber"
              value={maxNumber}
              onChange={(e) => setMaxNumber(+e.target.value)}
            />
          </div>
          <div>
            <label>Color de Fondo seleccionado (Grilla):</label>
            <input
              type="color"
              name="selectedBackgroundColor"
              value={selectedBackgroundColor}
              onChange={(e) => setSelectedBackgroundColor(e.target.value)}
            />
          </div>
          <div>
            <label>Color de Texto seleccionado (Grilla):</label>
            <input
              type="color"
              name="selectedTextColor"
              value={selectedTextColor}
              onChange={(e) => setSelectedTextColor(e.target.value)}
            />
          </div>
          <div>
            <label>Color de Fondo seleccionado (Pantalla Selección):</label>
            <input
              type="color"
              name="selectedBackgroundWindowColor"
              value={selectedBackgroundWindowColor}
              onChange={(e) => setSelectedBackgroundWindowColor(e.target.value)}
            />
          </div>
          <div>
            <label>Color de Texto seleccionado (Pantalla Selección):</label>
            <input
              type="color"
              name="selectedTextWindowColor"
              value={selectedTextWindowColor}
              onChange={(e) => setSelectedTextWindowColor(e.target.value)}
            />
          </div>
          <button
            className="buttons button-close"
            onClick={() => setShowEditMode(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};
