#include <iostream>
#include <iomanip>
#include <locale.h>

using namespace std;

template <typename T>
class Stack {
private:
	T *MyStack;
	T size;
	T head;
public:
	Stack(int = 100);
	~Stack();
	bool add(const T);
	bool dell();
	void show();

};

int main()
{
	setlocale(LC_ALL, "RUS");

	Stack <int> MyStack;
	int n;
	int ques;

	do {
		cout << "\n1: Вводит новый элементы\n";
		cout << "2: Показат элементы\n";
		cout << "3: Удалить элементы\n";
		cout << "Для выхода жми: 0\n";
		cin >> ques;
		switch (ques)
		{
		case 1: {
			cout << "Сколко добавить: ";
			cin >> n;
			int ct = 0;
			while (ct++ != n)
			{
				int temp;
				cin >> temp;
				MyStack.add(temp);
			}
			break;
		}
		case 2: {
			cout << "внутри: \n";
			MyStack.show();
			break;
		}
		case 3: {
			cout << "Стек очищен!\n ";
			MyStack.dell();
			break;
		}
		}
	} while (ques != 0);

	return 0;
}

// конструктор
template <typename T>
Stack<T>::Stack(int s)
{
	size = s > 0 ? s : size;   
	MyStack = new T[size]; 
	head = 0; 
}

// деструктор
template <typename T>
Stack<T>::~Stack()
{
	delete[] MyStack; 
}

template<typename T>
bool Stack<T>::add(const T value)
{
	if (head == size )
		return false; 
	head++;
	MyStack[head] = value;

	return true; 
}

template<typename T>
bool Stack<T>::dell()
{
	while (head != 0) {
		if (head == 0)
			return false;
		MyStack[head] = 0;
		head--;
	}

	return true;
}

template <typename T>
void Stack<T>::show()
{
	int ix;
	for (ix = head; ix > 0; ix--)
		cout << "-" << setw(4) << MyStack[ix] << endl;
}