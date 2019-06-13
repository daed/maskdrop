# maskdrop
Maskdrop:  A backlight mask generator for the Massdrop Alt

QMK (for the MD Alt/Ctrl specifically) uses a bitmask to define subsets of keys to apply RGB effects to.  An example of this is <a href="https://github.com/pleasuretek/qmk_firmware/blob/master/keyboards/massdrop/alt/keymaps/pleasuretek/keymap.c">found here</a>.

The problem becomes that this is not a straightforward thing to calculate.  You can use the Configurator, but that doesn't expose access to more customized colors and features that only a custom QMK configuration can provide.</p>

To use this page, click on a set of buttons in the table below to define a region of keys you want to share a common color, and then add the ranges to as line in your led_instruction_t set in keymap.c.

This page is live at http://daedalusrising.com/maskdrop/
