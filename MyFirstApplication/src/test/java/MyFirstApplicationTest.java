import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class MyFirstApplicationTest {

    @Test
    public void testSomeDifficultCalculation() {
        int input = 1;
        int result = MyFirstApplication.someDifficultCalculation(input);

        assertEquals(result, 2);
    }

    public void testSomeDifficultCalculationWithError() {
        int input = 2;
        int result = MyFirstApplication.someDifficultCalculation(input);

        assertEquals(result, 3);
    }
}
