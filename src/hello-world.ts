export const hello_world = {
    ada: `with TEXT_IO;
procedure HELLO is
begin
 TEXT_IO.PUT_LINE ("Hello, World!");
end HELLO;`,
    bash: '#!/bin/sh  echo "Hello, World!"',
    c: `#include <stdio.h>
int main(void) {
    printf("Hello, world!\\n");
    return 0;
}`,
    "c#": `using System;
class HelloWorld{
	static void Main() {
		System.Console.WriteLine("Hello, World!");
	}
}`,
    "c++": `#include <iostream>
 
int main() {
	std::cout << "Hello, World!\\n";
}`,
    dart: `main() {
  print('Hello World!');
}`,
    go: `package main
 
import "fmt"
 
func main() {
	fmt.Println("Hello World")
}`,
    java: `public class HelloWorld
   {
        public static void main(String[] args)
        {
             System.out.println("Hello, world!");
        }
   }`,
    javascript: 'console.log("Hello, world!");',
    kotlin: `fun main(args: Array<String>) {
  val scope = "world"
  println("Hello, $scope!")
}`,
    lua: 'print "Hello, World!"',
    mathematica: `(* Hello World in Mathematica *)
Print["Hello world"]`,
    matlab: "disp('Hello world')",
    pascal: `program hello;
 
begin
writeln('Hello, World!');
end.`,
    php: `<?php
 echo 'Hello, World!';
?>`,
    python: 'print "Hello, World!"',
    scala: `object HelloWorld with Application {
 Console.println("Hello, World!");
}`,
    sql: `CREATE TABLE message (text char(15));
INSERT INTO message (text) VALUES ('Hello, World!');
SELECT text FROM message;
DROP TABLE message;`,
    swift: 'print("hello world")',
};
