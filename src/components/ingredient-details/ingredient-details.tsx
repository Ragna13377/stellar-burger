import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredientsById } from '../../services/ingredients/selectors';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/ingredients/actions';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const isDirectNavigation = !location.state;
  const dispatch = useDispatch();
  const ingredientData = useSelector(getIngredientsById(id!));
  useEffect(() => {
    if (!ingredientData) dispatch(fetchIngredients());
  }, []);
  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      isDirect={isDirectNavigation}
    />
  );
};
