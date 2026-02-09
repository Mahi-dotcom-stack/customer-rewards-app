import { calculateRewards } from './rewardCalculator';

describe('calculateRewards', () => {
  
  // Test Case 1: Amount less than $50 (should return 0 points)
  test('should return 0 points for amount less than or equal to $50', () => {
    expect(calculateRewards(50)).toBe(0);
    expect(calculateRewards(25)).toBe(0);
    expect(calculateRewards(49.99)).toBe(0);
  });

  // Test Case 2: Amount between $50 and $100 (1 point per dollar above $50)
  test('should return correct points for amount between $50 and $100', () => {
    expect(calculateRewards(75)).toBe(25); // 75 - 50 = 25 points
    expect(calculateRewards(100)).toBe(50); // 100 - 50 = 50 points
    expect(calculateRewards(85.50)).toBe(35); // Math.floor(85.50 - 50) = 35 points
  });

  // Test Case 3: Amount over $100 (50 points + 2 points per dollar above $100)
  test('should return correct points for amount over $100', () => {
    expect(calculateRewards(120)).toBe(90); // 50 + (2 * 20) = 90 points
    expect(calculateRewards(150)).toBe(150); // 50 + (2 * 50) = 150 points
    expect(calculateRewards(100.01)).toBe(50); // 50 + (2 * 0) = 50 points (amount over 100 floored to 0)
  });

  // Test Case 4: Edge cases with fractional numbers
  test('should handle fractional numbers correctly', () => {
    expect(calculateRewards(75.75)).toBe(25); // Math.floor(75.75 - 50) = 25
    expect(calculateRewards(120.99)).toBe(90); // 50 + (2 * Math.floor(20.99)) = 90
    expect(calculateRewards(50.01)).toBe(0); // Math.floor(50.01 - 50) = 0
  });

  // Test Case 5: Large amounts to test scalability
  test('should calculate correctly for large transaction amounts', () => {
    expect(calculateRewards(500)).toBe(850); // 50 + (2 * 400) = 850 points
    expect(calculateRewards(1000)).toBe(1850); // 50 + (2 * 900) = 1850 points
    expect(calculateRewards(999.99)).toBe(1848); // 50 + (2 * Math.floor(899.99)) = 1848
  });

  // Test Case 6: Exact boundary values
  test('should handle boundary values correctly', () => {
    expect(calculateRewards(50)).toBe(0); // Lower boundary
    expect(calculateRewards(100)).toBe(50); // Upper boundary of middle range
  });

  // Test Case 7: Very small positive amounts
  test('should handle very small positive amounts', () => {
    expect(calculateRewards(0.01)).toBe(0);
    expect(calculateRewards(1)).toBe(0);
    expect(calculateRewards(10)).toBe(0);
  });

  // Test Case 8: Example from problem statement
  test('should calculate example from problem statement correctly', () => {
    // A $120 purchase: 2x$20 + 1x$50 = 90 points
    expect(calculateRewards(120)).toBe(90);
  });
});
