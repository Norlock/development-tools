import java.math.BigDecimal;
import java.util.ArrayList;

public class MyFirstApplication {

    private static String notTrimmed = " This string won't be trimmed ";

    public static void main(String[] args) {
		congratulateUser();
		int result = someDifficultCalculation(1);
	}

	/**
	 * Method that congratulates the user.
	 */
	public static void congratulateUser() {
	    notTrimmed.trim();
		System.out.println("Congratulations, you have succesfully run this application!");
	}

	/**
	 * Unused method to demonstrate how you can generate Javadoc from the command line
	 * @param argument1 The first argument
	 * @param argument2 The second argument
	 * @return The sentence "Congratulations!"
	 */
	public static String unusedMethodWithArguments(int argument1, double argument2) {
		return "Congratulations!";
	}

	/**
	 * Very difficult calculation method that calculates the next logical natural
	 * sequential value within the limits of Integer domain.
	 * @param argument The input
	 * @return the next logical natural sequential number of the argument
	 */
	public static int someDifficultCalculation(int argument) {
		return argument + 1;
	}

}
