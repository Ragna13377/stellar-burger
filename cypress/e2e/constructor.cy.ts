import { data as mockIngredients } from '../fixtures/ingredients.json';
import { order as mockOrder } from '../fixtures/orderResponse.json';
import { accessToken, refreshToken } from '../fixtures/tokens.json';
import { setCookie } from '../../src/utils/cookie';
import { afterEach } from 'mocha';
describe('Тестирование бургер конструктора', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'userResponse.json'
    }).as('userAuth');
    cy.wait('@getIngredients');
    cy.wait('@userAuth');
  });
  describe('Открытие и закрытие модального окна', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredientList"]').find('li').first().click();
      cy.get('[data-cy="modalContent"]')
        .as('modalContent')
        .should('be.visible');
    });
    it('Закрытие по кнопке', () => {
      cy.get('@modalContent').find('button').click();
      cy.get('@modalContent').should('not.exist');
    });
    it('Закрытие по оверлею', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('@modalContent').should('not.exist');
    });
  });
  describe('Тестирование ингредиентов', () => {
    it('Количество отрендеренных ингредиентов', () => {
      cy.get('[data-cy="ingredientName"]').should(
        'have.length',
        mockIngredients.length
      );
    });
    it('Добавление ингредиентов в конструктор', () => {
      let bunIngredient = '';
      const fillIngredients: string[] = [];
      let orderPrice = 0;
      cy.get('[data-cy="ingredientList"]').each((list, index) => {
        cy.wrap(list)
          .find('li')
          .first()
          .within(() => {
            cy.get('[data-cy="ingredientName"]')
              .invoke('text')
              .then((text) => {
                cy.get('[data-cy="ingredientPrice"]')
                  .invoke('text')
                  .then((price) => {
                    if (text.includes('булка')) {
                      bunIngredient = text;
                      orderPrice += Number(price) * 2;
                    } else {
                      fillIngredients.push(text);
                      orderPrice += Number(price);
                    }
                  });
              });
            cy.get('button').click();
          });
      });
      cy.get('[data-cy="sendOrder"]')
        .find('p')
        .invoke('text')
        .then((text) => {
          expect(Number(text)).to.equal(orderPrice);
        });
      cy.get('[data-cy="ingredientsBun"], [data-cy="ingredientFill"]').each(
        (element) => {
          cy.wrap(element).within(() => {
            cy.get('.constructor-element__text')
              .invoke('text')
              .then((text) => {
                if (element.attr('data-cy') === 'ingredientsBun')
                  expect(text.includes(bunIngredient)).to.be.true;
                else expect(fillIngredients.includes(text)).to.be.true;
              });
          });
        }
      );
    });
  });
  describe('Оформление заказа', () => {
    it('Отправка заказа на сервер', () => {
      cy.get('[data-cy="ingredientList"]').each((list, index) => {
        cy.wrap(list)
          .find('li')
          .first()
          .within(() => {
            cy.get('button').should('be.enabled').click();
          });
      });
      cy.intercept('POST', 'api/orders', {
        fixture: 'orderResponse.json'
      }).as('getOrder');
      cy.get('[data-cy="sendOrder"] button').should('be.enabled').click();
      cy.wait('@getOrder');
      cy.get('[data-cy="modalContent"]')
        .as('modalContent')
        .should('be.visible')
        .within(() => {
          cy.get('h2')
            .invoke('text')
            .then((text) => {
              expect(Number(text)).to.equal(mockOrder.number);
            });
          cy.get('button').click();
        });
      cy.get('@modalContent').should('not.exist');
      cy.get('[data-cy="ingredientsBun"], [data-cy="ingredientFill"]').should(
        'not.exist'
      );
    });
  });
});
