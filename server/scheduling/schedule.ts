export abstract class Schedule {
    /**
     * Job name
     */
    abstract readonly name: string;

    // example */3 * * * * * - every 3 seconds
    /**
     * Cron job pattern
     */
    abstract readonly pattern: string;

    /**
     * Function whihch perfomr depend on pattern
     */
    abstract handler(): Promise<void>
}
