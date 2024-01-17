import re

def convert_price_to_k(price_str):
    price_num = float(price_str.replace(",", ""))
    return f"{price_num / 1000:.1f}k" if price_num % 1000 != 0 else f"{int(price_num / 1000)}k"

def update_file(file_name='converted_properties_data_updated'):
    with open(file_name, 'r') as file:
        content = file.read()
    
    updated_content = re.sub(r'price_Sq": "(\d{1,3}(,\d{3})*)"', 
                             lambda m: f'price_Sq": "{convert_price_to_k(m.group(1))}"', 
                             content)
    
    with open(file_name, 'w') as file:
        file.write(updated_content)

# Replace 'your_file_name.js' with the name of your JavaScript file
update_file('converted_properties_data_updated.js')
