import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts"
import { lazer } from "./lazer.ts";

const decorate_echo = (printer: any): { stdout: string } => 
{
    const context = { stdout: '' }
    const orig = printer['echoInternal'];
    printer['echoInternal'] = (output: string) => 
    {
        context.stdout += output;
        return orig(output);
    }

    return context;
}

// Printer #if
Deno.test('Printer #if should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);
    
    printer
        .if(true)
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #if should not print following statements when condition is false', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #if should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #if should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});

// Printer #elseif
Deno.test('Printer #elseif should print following statements when condition is true', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false")
        .elseif(true)
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is false"), false);
    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #elseif should not print following statements when a previous block has been entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(false)
        .print_ln("this is false elseif")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is false elseif"), false);
});

Deno.test('Printer #elseif not should print following statements when condition is false', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #elseif should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .elseif(true)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #elseif should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .elseif(false)
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});

// Printer #else
Deno.test('Printer #else should not print if previous if block entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false"), false);
});

Deno.test('Printer #else should not print if previous if block entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .print_ln("this is true")
        .elseif(false)
        .print_ln("this is false elseif")
        .else()
        .print_ln("this is false else")
        .end();

    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false elseif"), false);
    assertEquals(context.stdout.includes("this is false else"), false);
});

Deno.test('Printer #else should not print if previous elseif block entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(true)
        .print_ln("this is true")
        .else()
        .print_ln("this is false else")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is true"), true);
    assertEquals(context.stdout.includes("this is false else"), false);
});

Deno.test('Printer #else should print if previous if/elseif block not entered', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .print_ln("this is false if")
        .elseif(false)
        .print_ln("this is false elseif")
        .else()
        .print_ln("this is true")
        .end();

    assertEquals(context.stdout.includes("this is false if"), false);
    assertEquals(context.stdout.includes("this is false elseif"), false);
    assertEquals(context.stdout.includes("this is true"), true);
});

Deno.test('Printer #else should print all statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(false)
        .else()
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), true);
    assertEquals(context.stdout.includes("this is true 2"), true);
    assertEquals(context.stdout.includes("this is true 3"), true);
});

Deno.test('Printer #else should print no statements in the block', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .if(true)
        .else()
        .print_ln("this is true 1")
        .print_ln("this is true 2")
        .print_ln("this is true 3")
        .end();

    assertEquals(context.stdout.includes("this is true 1"), false);
    assertEquals(context.stdout.includes("this is true 2"), false);
    assertEquals(context.stdout.includes("this is true 3"), false);
});

Deno.test('Printer #buffer should buffer print calls', () => 
{
    const printer = lazer();

    const buffer = printer
        .buffer()
        .print("Test buffer")
        .return();

    assertEquals(buffer, "Test buffer\x1b[0m");
});

Deno.test('Printer #buffer should not print to stdout when in buffer mode', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .buffer()
        .print("Test buffer")
        .return();

    assertEquals(context.stdout.includes("Test buffer"), false);
});

Deno.test('Printer #return should return current buffer value', () => 
{
    const printer = lazer();

    const buffer = printer
        .buffer()
        .print("Test buffer")
        .return();

    assertEquals(buffer, "Test buffer\x1b[0m");
});

Deno.test('Printer #return should append reset char to buffer value', () => 
{
    const printer = lazer();

    const buffer = printer
        .buffer()
        .print("Test buffer")
        .return();

    assertEquals(buffer.endsWith("\x1b[0m"), true);
});

Deno.test('Printer #store should store current buffer under given alias', () => 
{
    const printer = lazer();
    const context = decorate_echo(printer);

    printer
        .buffer()
        .set_color_red().print_ln("Some red output to buffer")
        .store('i am an alias');

    assertEquals(context.stdout.includes("Some red output to buffer"), false);

    printer
        .buffer()
        .load('i am an alias')
        .print_b();

    assertEquals(context.stdout.includes("Some red output to buffer"), true);
});