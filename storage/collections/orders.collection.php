<?php
 return array (
  'name' => 'orders',
  'label' => '',
  '_id' => 'orders5d775d91bd0b0',
  'fields' => 
  array (
    0 => 
    array (
      'name' => 'name',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    1 => 
    array (
      'name' => 'address',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    2 => 
    array (
      'name' => 'totalPrice',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'type' => 'number',
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    3 => 
    array (
      'name' => 'products',
      'label' => '',
      'type' => 'repeater',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'field' => 
        array (
          'type' => 'set',
          'name' => 'product',
          'label' => 'Individual Product',
          'options' => 
          array (
            'fields' => 
            array (
              0 => 
              array (
                'name' => 'id',
                'type' => 'text',
                'label' => 'Id',
              ),
              1 => 
              array (
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
              ),
              2 => 
              array (
                'name' => 'price',
                'type' => 'text',
                'label' => 'Price',
              ),
              3 => 
              array (
                'name' => 'quantity',
                'type' => 'text',
                'label' => 'Quantity',
              ),
            ),
          ),
        ),
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
  ),
  'sortable' => false,
  'in_menu' => false,
  '_created' => 1568103825,
  '_modified' => 1568282196,
  'color' => '',
  'acl' => 
  array (
    '' => 
    array (
      'collection_edit' => false,
    ),
    'public' => 
    array (
      'entries_create' => false,
      'entries_view' => false,
      'entries_edit' => false,
      'entries_delete' => false,
    ),
  ),
  'rules' => 
  array (
    'create' => 
    array (
      'enabled' => false,
    ),
    'read' => 
    array (
      'enabled' => false,
    ),
    'update' => 
    array (
      'enabled' => false,
    ),
    'delete' => 
    array (
      'enabled' => false,
    ),
  ),
);