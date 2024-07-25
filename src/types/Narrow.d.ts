/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/**
 * Similar to [[Cast]] but with a custom fallback `Catch`. If it fails,
 * it will enforce `Catch` instead of `A2`.
 * @param A1 to check against
 * @param A2 to try/test with
 * @param Catch to fallback to if the test failed
 * @returns `A1 | Catch`
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Try<'42', string>          // '42'
 * type test1 = A.Try<'42', number>          // never
 * type test1 = A.Try<'42', number, 'tried'> // 'tried'
 * ```
 */
export type Try<A1 extends any, A2 extends any, Catch = never> = A1 extends A2
  ? A1
  : Catch;

/**
 * Describes types that can be narrowed
 */
export type Narrowable = string | number | bigint | boolean;

/**
 * @hidden
 */
type NarrowRaw<A> =
  | (A extends [] ? [] : never)
  | (A extends Narrowable ? A : never)
  | { [K in keyof A]: A[K] extends Function ? A[K] : NarrowRaw<A[K]> };

/**
 * Prevent type widening on generic function parameters
 * @param A to narrow
 * @returns `A`
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * declare function foo<A extends any[]>(x: F.Narrow<A>): A;
 * declare function bar<A extends object>(x: F.Narrow<A>): A;
 *
 * const test0 = foo(['e', 2, true, {f: ['g', ['h']]}])
 * // `A` inferred : ['e', 2, true, {f: ['g']}]
 *
 * const test1 = bar({a: 1, b: 'c', d: ['e', 2, true, {f: ['g']}]})
 * // `A` inferred : {a: 1, b: 'c', d: ['e', 2, true, {f: ['g']}]}
 * ```
 */
type Narrow<A extends any> = Try<A, [], NarrowRaw<A>>;

export type { Narrow };
